import { useState } from "react";
import ApplicationList from "./ApplicationList";
import { useApplications } from "../../../hooks/useApplications";
import { updateApplicationStatus } from "../../../services/api";

export default function ApplicationManagement() {
  const { applications, loading, error, refetch } = useApplications();
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      refetch();
      setUpdateError(null);
    } catch (err) {
      setUpdateError("Failed to update application status");
      console.error("Error updating application status:", err);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        {updateError && <p className="mt-2 text-red-600">{updateError}</p>}
      </div>

      <ApplicationList
        applications={applications!}
        loading={loading}
        // @ts-ignore
        error={error}
        onStatusChange={handleStatusChange}
        onRefetch={refetch}
      />
    </div>
  );
}
