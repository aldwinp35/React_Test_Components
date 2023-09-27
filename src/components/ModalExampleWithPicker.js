/*
Modal example with the following libraries: 
reactstrap,
react-hook-form, 
react-number-format
vanillajs-datepicker
*/
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
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

import { CustomSelect } from "./select/CustomSelect";
import DatepickerComponent from "./datepicker/DatepickerComponent";

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

export function ModalExampleWithPicker() {
  // Modal state
  const [modal, setModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggle = () => setModal(!modal);

  // Setting form fields
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: null,
      date: "",
      amount: ""
    }
  });

  // Submit form method
  const onSubmit = (data) => {
    // Send data
    console.log("Custom: ", data);

    // close modal
    // toggle();
  };

  // Set values on mount DOM
  useEffect(() => {
    if (isEditMode) {
      setValue("category", { id: 1, value: "chocolate", label: "Chocolate" });
      setValue("date", "2020-01-01");
      setValue("amount", "5000");
    } else {
      setValue("category", "");
      setValue("date", "");
      setValue("amount", null);
    }
  }, [isEditMode, modal, setValue]);

  return (
    <div className="my-1 border p-2">
      <h2>Modal (custom fields)</h2>
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
              <Label for="input-text-category">
                Category <span className="text-danger">*</span>
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "This field is required" }}
                render={() => {
                  return (
                    <CustomSelect
                      isClearable
                      inputId="input-text-category"
                      // isDisabled={isLoading}
                      // isLoading={isLoading}
                      onChange={(value) => {
                        if (!value) {
                          setValue("category", "");
                          setError("category", {
                            message: "This field is required"
                          });
                          return;
                        }

                        setValue("category", value);
                        clearErrors("category");
                      }}
                      // onCreateOption={handleCreate}
                      options={[
                        { id: 1, value: "chocolate", label: "Chocolate" },
                        { id: 2, value: "strawberry", label: "Strawberry" },
                        { id: 3, value: "vanilla", label: "Vanilla" }
                      ]}
                      invalid={errors?.category ? true : false}
                      value={getValues("category")}
                    />
                  );
                }}
              />
              <small className="text-danger">{errors.category?.message}</small>
            </FormGroup>

            <FormGroup>
              <Label for="input-text-amount">
                Amount <span className="text-danger">*</span>
              </Label>
              <Controller
                name="amount"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field: { onChange } }) => {
                  return (
                    <NumericFormat
                      id="input-text-amount"
                      prefix="$"
                      value={getValues("amount")}
                      onValueChange={(v) => onChange(v.floatValue)}
                      thousandSeparator
                      allowNegative={false}
                      customInput={Input}
                      invalid={errors?.amount ? true : false}
                    />
                  );
                }}
              />

              <FormFeedback>{errors.amount?.message}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="input-text-date">
                Date <small>(mm/dd/yyyy)</small>{" "}
                <span className="text-danger">*</span>
              </Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "This field is required" }}
                render={() => {
                  return (
                    <DatepickerComponent
                      selected={getValues("date")}
                      customInput={
                        <Input
                          id="input-text-date"
                          invalid={errors?.date ? true : false}
                        />
                      }
                      onChangeDate={(e) => {
                        // Make sure this field is not blank
                        if (!e.detail.date) {
                          setValue("date", "");
                          setError("date", {
                            message: "This field is required"
                          });
                          return;
                        }

                        // Set field and clear error
                        const isoDate = e.detail.date
                          .toISOString()
                          .split("T")[0];
                        setValue("date", isoDate);
                        clearErrors("date");

                        // let strDate = e.target.value;
                        // setValue("date", strDate);
                        // clearErrors("date");
                      }}
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
