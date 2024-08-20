const { validationResult } = require("express-validator");
const { HttpStatus } = require("../../utils/commonFunctions");
const Store = require("./store.model");

// Helper Function for Error Handling
function handleError(
  res,
  error,
  code = 500,
  message = "Internal Server Error"
) {
  console.error(error);
  return HttpStatus({ res: res, code, data: message });
}

// Helper Function for Validation
function validateRequest(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return HttpStatus({ res: res, code: 400, data: errors.array() });
  }
}

// Async Function to Get Store Status
async function getStatus(req, res) {
  // console.log("called getStatus server");
  try {
    const [total, s1, s2, lowStock, critical, pmScheduled] = await Promise.all([
      Store.countDocuments(),
      Store.countDocuments({ location: "S1" }),
      Store.countDocuments({ location: "S2" }),
      Store.countDocuments({ critical: true, stock: { $lte: 5 } }),
      Store.countDocuments({ critical: true }),
      Store.countDocuments({ pmScheduled: true }),
    ]);
    // const data = [{ total, s1, s2, critical, pmScheduled, lowStock }];
    const data = [{ total, s1, s2, critical, pmScheduled, lowStock }];

    return HttpStatus({ res: res, code: 200, data });
  } catch (error) {
    return handleError(res, error);
  }
}

// Async Function to Get Store Items
async function getStore(req, res) {
  // console.log("called getstore server");

  validateRequest(req, res);

  const { loc: store, skip = 0 } = req.query;

  let pass = skip < 10 ? 0 : skip;

  try {
    let query = {};
    if (store === "s1" || store === "s2") {
      query.location = store.toUpperCase();
    } else if (store !== "all") {
      return HttpStatus({ res: res, code: 204 });
    }

    const data = await Store.find(query).skip(pass).limit(10);

    return HttpStatus({ res: res, code: 200, data });
  } catch (error) {
    return handleError(res, error);
  }
}

// Async Function to Search Store Items
async function searchStoreItem(req, res) {
  // console.log("called searchStore server");
  validateRequest(req, res);

  const { search = "", pmScheduled = false, critical = false } = req.query;

  try {
    let data = [];
    if (search && pmScheduled && critical) {
      return HttpStatus({
        res: res,
        code: 204,
        data: "Cannot search all parameters together.",
      });
    }
    if (!isNaN(search) && search.length === 6) {
      data = await Store.find({ material: search }).select("-__v");
    } else {
      data = await Store.find({ $text: { $search: search } }).select("-__v");
    }
    if (pmScheduled) {
      data = await Store.find({ pmScheduled: true }).select("-__v");
      // console.log(data);
    }
    if (critical) {
      data = await Store.find({ pmScheduled: true }).select("-__v");
    }

    if (!data.length) {
      return HttpStatus({ res: res, code: 204, data: "No items found" });
    }

    return HttpStatus({ res: res, code: 200, data });
  } catch (error) {
    return handleError(res, error);
  }
}

// Async Function to Create Store Item
async function createStoreItem(req, res) {
  validateRequest(req, res);

  const {
    material,
    materialDescription,
    materialGroup,
    location,
    unitPrice,
    stock,
    uom,
    pmScheduled,
    critical,
  } = req.body;

  if (
    ![
      material,
      materialDescription,
      materialGroup,
      location,
      unitPrice,
      stock,
      uom,
    ].every(Boolean)
  ) {
    return HttpStatus({ res: res, code: 406, data: "Missing required fields" });
  }

  try {
    const existingItem = await Store.findOne({ material });
    if (existingItem) {
      return HttpStatus({ res: res, code: 409, data: "Item already exists" });
    }

    const newItem = await Store.create({
      material: material,
      materialDescription: materialDescription.toUpperCase(),
      materialGroup: materialGroup.toUpperCase(),
      location: location.toUpperCase(),
      unitPrice: Number(unitPrice),
      stock: Number(stock),
      uom: uom.toUpperCase(),
      pmScheduled: pmScheduled || false,
      critical: critical || false,
    });

    return HttpStatus({ res: res, code: 201, data: newItem });
  } catch (error) {
    return handleError(res, error);
  }
}

// Async Function to Update Store Item
async function updateStore(req, res) {
  // console.log("called UpdateStore server");
  validateRequest(req, res);

  const {
    material,
    materialDescription,
    materialGroup,
    location,
    unitPrice,
    stock,
    uom,
    pmScheduled,
    critical,
  } = req.body;
  console.log(req.body);
  try {
    const existingItem = await Store.findOne({ material });

    if (!existingItem) {
      return HttpStatus({ res: res, code: 404, data: "Item not found" });
    }
    if (
      materialDescription.length &&
      existingItem.materialDescription !== materialDescription?.toUpperCase()
    ) {
      existingItem.materialDescription = materialDescription;
    }
    if (
      materialGroup.length &&
      existingItem.materialGroup !== materialGroup?.toUpperCase()
    ) {
      existingItem.materialGroup = materialGroup;
    }
    if (
      location.length &&
      existingItem.location.toUpperCase() !== materialGroup?.toUpperCase()
    ) {
      existingItem.location = location.toUpperCase();
    }
    if (unitPrice && existingItem.unitPrice !== Number(unitPrice)) {
      existingItem.unitPrice = Number(unitPrice);
    }
    if (stock && existingItem.stock !== Number(stock)) {
      existingItem.stock = Number(stock);
    }
    if (uom.length && existingItem.uom !== uom?.toUpperCase()) {
      existingItem.uom = uom?.toUpperCase();
    }

    if (existingItem.pmScheduled !== pmScheduled) {
      existingItem.pmScheduled = pmScheduled;
    }
    if (existingItem.critical !== critical) {
      existingItem.critical = critical || existingItem.critical;
    }

    await existingItem.save();
    return HttpStatus({
      res: res,
      code: 201,
      data: "Item updated successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// Async Function to Remove Store Item
async function removeStoreItem(req, res) {
  // console.log("called removeStore server");
  validateRequest(req, res);

  const { material, isApproved } = req.body;

  if (!material || typeof isApproved !== "boolean") {
    return HttpStatus({
      res: res,
      code: 400,
      data: "Invalid material number or approval status required!",
    });
  }

  try {
    const item = await Store.findOne({ material: material });
    if (!item) {
      return HttpStatus({ res: res, code: 404, data: "Material not found!" });
    }

    if (item.stock > 0) {
      return HttpStatus({
        res: res,
        code: 400,
        data: "Cannot delete item with stock greater than zero.",
      });
    }

    await Store.findOneAndDelete({ material });
    return HttpStatus({
      res: res,
      code: 204,
      data: "Item deleted successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
}

module.exports = {
  getStore,
  searchStoreItem,
  updateStore,
  createStoreItem,
  removeStoreItem,
  getStatus,
};
