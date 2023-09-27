/*
Modal example with the following libraries: 
reactstrap,
react-hook-form
*/
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Input,
  Label,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const CloseModalButton = ({ handleClose }) => {
  return (
    <div
      role="button"
      className="btn-close bg-light"
      onClick={handleClose}
      aria-label="Close"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.key === " ") {
          handleClose();
        }
      }}
    />
  );
};

export function ModalExample() {
  // Modal state
  const [modal, setModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggle = () => setModal(!modal);

  // Setting form fields
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      date: "",
      amount: ""
    }
  });

  // Submit form method
  const onSubmit = (data) => {
    // Parse amount to float
    data.amount = parseFloat(data.amount);

    // Send data
    console.log("Default: ", data);

    // close modal
    // toggle();
  };

  // Set values on mount DOM
  useEffect(() => {
    if (isEditMode) {
      setValue("date", "2020-01-01");
      setValue("amount", "5000");
    } else {
      setValue("date", "");
      setValue("amount", "");
    }
  }, [isEditMode, modal, setValue]);

  return (
    <div className="my-1 border p-2">
      <h2>Modal (default fields)</h2>
      <div className="d-flex gap-2 mb-2">
        <Button color="primary" size="sm" onClick={toggle}>
          Open Modal
        </Button>

        <Button
          color="info"
          size="sm"
          onClick={(e) => {
            setIsEditMode(!isEditMode);
          }}
        >
          Edit Mode: {isEditMode ? "Yes" : "No"}
        </Button>
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        onClosed={reset}
        backdrop="static"
        centered
      >
        <ModalHeader
          className="border-0"
          close={<CloseModalButton handleClose={toggle} />}
        >
          Add new entry
        </ModalHeader>
        <div className="px-3 text-secondary">
          Add a new entry to be shown in your feed.
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="input-text-amount">
                Amount <span className="text-danger">*</span>
              </Label>
              <Controller
                name="amount"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => {
                  return (
                    <Input
                      id="input-text-amount"
                      type="number"
                      invalid={errors?.amount ? true : false}
                      {...field}
                    />
                  );
                }}
              />

              <FormFeedback>{errors.amount?.message}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="input-text-date">
                Date <span className="text-danger">*</span>
              </Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => {
                  return (
                    <Input
                      id="input-text-date"
                      type="date"
                      invalid={errors?.date ? true : false}
                      {...field}
                    />
                  );
                }}
              />

              <FormFeedback>{errors.date?.message}</FormFeedback>
            </FormGroup>
            <ModalFooter className="p-0 border-0 justify-content-between">
              <div className="fst-italic">
                <span className="text-danger fw-bold">*</span> Required fields
              </div>
              <Button type="submit" color="primary">
                Add entry
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
