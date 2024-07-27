
import React from "react";
import { manipulationString } from "@src/utils/helper";
import { FormProps } from '@src/types/formTypes';
import {
  DialogOverlay,
  Dialog,
  DialogHeader,
  DialogContent,
  FormField,
  Label,
  Input,
  SubmitButton,
  CancelButton
} from "@src/styles/FormStyles";
import { useForm } from "@src/hooks/useForm";

const Form: React.FC<FormProps> = ({
  type,
  attributes,
  entityListData,
  open,
  close = () => {},
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
  id,
}) => {
  const { item, title, buttonText, handleChange, handleSubmit } = useForm({
    type,
    attributes,
    entityListData,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    id,
  });

  if (!open) return null;

  const renderFormFields = () => (
    <div className="form-edit-data">
      {attributes.map((attr) => (
        <FormField key={attr}>
          <Label htmlFor={attr}>{manipulationString('capitalizeChar',manipulationString('formatAttributeName',attr) as string)}</Label>
          <Input
            id={attr}
            type="text"
            value={item[attr] || ""}
            onChange={(e) => handleChange(attr, e.target.value)}
          />
        </FormField>
      ))}
    </div>
  );

  const onSubmit = () => {
    handleSubmit();
    close();
  };

  return (
    <DialogOverlay>
      <Dialog>
        <DialogHeader>
          <h2>{title}</h2>
        </DialogHeader>
        <DialogContent>
          {type === "delete"
            ? "Are you sure you want to delete this item?"
            : renderFormFields()}
        </DialogContent>
        <div className="dialog-actions">
          <SubmitButton onClick={onSubmit}>{buttonText}</SubmitButton>
          <CancelButton onClick={close}>Cancel</CancelButton>
        </div>
      </Dialog>
    </DialogOverlay>
  );
};

export default Form;