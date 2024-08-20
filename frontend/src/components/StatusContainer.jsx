import React, { useEffect, useState } from "react";

import Status from "../widgets/Status";
import Loading from "../widgets/Loading";
import { useSelector } from "react-redux";

export default function StatusContainer() {
  const { status } = useSelector((state) => state.nav);

  useEffect(() => {}, []);

  if (!status) {
    return <Loading msg={"status loading..."} />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
      <Status name="Total" count={status.total} color={"border-blue-600"} />
      <Status name="S1" count={status.s1} color={"border-green-600"} />
      <Status name="S2" count={status.s2} color={"border-yellow-600"} />
      <Status
        name="PM Scheduled"
        count={status.pmScheduled}
        color={"border-indigo-600"}
      />
      <Status
        name="Critical Spare"
        count={status.critical}
        color={"border-real-600"}
      />
      <Status
        name="Critical < 5"
        count={status.lowStock}
        color={"border-red-600"}
      />
    </div>
  );
}
