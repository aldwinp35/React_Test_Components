/*
Alert example
*/
import React from "react";
import { Button } from "reactstrap";
import { alertService } from "../api/alertService";

export function AlertExample() {
  // Alert methods
  const showSuccess = () => {
    alertService.success("Alert success");
  };

  const showInfo = () => {
    alertService.info("Alert info");
  };

  const showWarning = () => {
    alertService.warn("Alert warn");
  };

  const showError = () => {
    alertService.error("Alert error");
  };

  return (
    <div className="my-1 border p-2">
      <h2>Alert</h2>
      <div className="d-flex gap-2">
        <Button onClick={showSuccess} size="sm" color="success">
          Show alert
        </Button>
        <Button onClick={showInfo} size="sm" color="info">
          Show alert
        </Button>
        <Button onClick={showWarning} size="sm" color="warning">
          Show alert
        </Button>
        <Button onClick={showError} size="sm" color="danger">
          Show alert
        </Button>
      </div>
    </div>
  );
}
