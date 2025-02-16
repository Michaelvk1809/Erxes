import React, { useEffect, useRef, useState } from "react";

import ControlLabel from "@erxes/ui/src/components/form/Label";
import { IFieldLogic } from "../../types";
import { IFilterType } from "../../containers/chart/ChartFormField";
import { ControlRange } from "../../styles";
import SelectBranches from "@erxes/ui/src/team/containers/SelectBranches";
import SelectBrands from "@erxes/ui/src/brands/containers/SelectBrands";
import SelectClientPortal from "../utils/SelectClientPortal";
import SelectCompanies from "@erxes/ui-contacts/src/companies/containers/SelectCompanies";
import SelectCustomers from "@erxes/ui-contacts/src/customers/containers/SelectCustomers";
import SelectDepartments from "@erxes/ui/src/team/containers/SelectDepartments";
import SelectLeads from "../utils/SelectLeads";
import SelectProducts from "@erxes/ui-products/src/containers/SelectProducts";
import SelectTeamMembers from "@erxes/ui/src/team/containers/SelectTeamMembers";
import SelectDate from "../utils/SelectDate";
import { SelectWithAssets } from "../utils/SelectAssets";
import { FormControl } from "@erxes/ui/src/components/form";
import CustomSelect from "../utils/CustomSelect";
import { generateInitialOptions } from "../../utils";

type Props = {
  fieldType: string;
  fieldQuery: string;
  multi?: boolean;
  fieldLabel: string;
  fieldOptions: any[];
  initialValue?: any;
  fieldAttributes?: any[]
  onChange: (input: any) => void;
  setFilter?: (fieldName: string, value: any) => void;
  startDate?: Date;
  endDate?: Date;
  fieldValues?: any;
  fieldLogics?: IFieldLogic[];
  fieldDefaultValue?: any;
  filterType: IFilterType;
  fieldValueOptions?: any[]
};
const ChartFormField = (props: Props) => {
  const {
    fieldQuery,
    fieldType,
    fieldOptions,
    fieldLabel,
    fieldAttributes,
    initialValue,
    multi,
    onChange,
    setFilter,
    startDate,
    endDate,
    fieldDefaultValue,
    filterType,
    fieldValueOptions
  } = props;

  const { fieldQueryVariables } = filterType;

  const timerRef = useRef<number | null>(null);

  const [fieldValue, setFieldValue] = useState(initialValue);

  useEffect(() => {
    if (!fieldValue && fieldDefaultValue) {
      setFieldValue(fieldDefaultValue);
      onChange(fieldDefaultValue);
    }
  }, [fieldDefaultValue]);

  const onSelect = (selectedOption: any, value?: string) => {

    if (selectedOption === undefined || selectedOption === null) {
      setFieldValue("");
      onChange("");

      return
    }

    if (multi && Array.isArray(selectedOption)) {
      const selectedValues = (selectedOption || []).map(option => option.value);

      const modifiedOptions = value
        ? selectedOption.map(({ [value]: ommited, ...rest }) => rest)
        : selectedValues;

      setFieldValue(modifiedOptions);
      onChange(modifiedOptions);

      return;
    }

    const selectedValue = selectedOption.value;

    setFieldValue(selectedValue);
    onChange(selectedValue);
  };

  const handleDateRange = (dateRange: any) => {
    const { startDate, endDate } = dateRange;

    if (setFilter && startDate && endDate) {
      setFilter("startDate", startDate);
      setFilter("endDate", endDate);
    }
  };

  const OnSaveBrands = (brandIds: string[] | string) => {
    if (setFilter) {
      setFilter("brandIds", brandIds);
    }
  };

  const handleInput = (e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const { name, value } = e.target

    const newFieldValues = fieldValue ? { ...fieldValue } : {};
    newFieldValues[name] = value

    setFieldValue(newFieldValues);

    timerRef.current = window.setTimeout(() => {
      onChange(newFieldValues);
    }, 500)
  }

  switch (fieldQuery) {
    case "users":
      return (
        <div>
          <ControlLabel>{fieldLabel}</ControlLabel>

          <SelectTeamMembers
            multi={multi}
            name="chartAssignedUserIds"
            label={fieldLabel}
            onSelect={onChange}
            initialValue={fieldValue}
          />
        </div>
      );

    case "departments":
      return (
        <div>
          <ControlLabel>{fieldLabel}</ControlLabel>

          <SelectDepartments
            multi={multi}
            filterParams={{ withoutUserFilter: true }}
            name="chartAssignedDepartmentIds"
            label={fieldLabel}
            onSelect={onChange}
            initialValue={fieldValue}
          />
        </div>
      );

    case "branches":
      return (
        <div>
          <ControlLabel>{fieldLabel}</ControlLabel>

          <SelectBranches
            multi={multi}
            filterParams={{ withoutUserFilter: true }}
            name="chartAssignedBranchIds"
            label={fieldLabel}
            onSelect={onChange}
            initialValue={fieldValue}
          />
        </div>
      );

    case "brands":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>
          <SelectBrands
            multi={true}
            name="selectedBrands"
            label={"Choose brands"}
            onSelect={OnSaveBrands}
            initialValue={fieldValue}
          />
        </div>
      );
    case "forms":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>

          <SelectLeads
            multi={true}
            name="selecteForms"
            label={"Choose forms"}
            onSelect={onChange}
            initialValue={fieldValue}
            filterParams={JSON.parse(fieldQueryVariables)}
          />
        </div>
      );
    case "clientPortalGetConfigs":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>

          <SelectClientPortal
            multi={true}
            name="selectePortal"
            label={"Choose portal"}
            onSelect={onChange}
            initialValue={fieldValue}
            filterParams={JSON.parse(fieldQueryVariables)}
          />
        </div>
      );
    case "assets":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>
          <SelectWithAssets
            label="Choose Asset"
            name="assets"
            multi={multi}
            initialValue={fieldValue}
            onSelect={onChange}
          />
        </div>
      );
    case "companies":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>
          <SelectCompanies
            label="Select companies"
            name="companyId"
            multi={multi}
            initialValue={fieldValue}
            onSelect={onChange}
          />
        </div>
      );
    case "customers":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>
          <SelectCustomers
            label="Select customers"
            name="customerId"
            multi={multi}
            initialValue={fieldValue}
            onSelect={onChange}
          />
        </div>
      );
    case "products":
      return (
        <div>
          <ControlLabel> {fieldLabel}</ControlLabel>
          <SelectProducts
            label="Select products"
            name="productId"
            multi={multi}
            initialValue={fieldValue}
            onSelect={onChange}
          />
        </div>
      );
    case "date":
      return (
        <SelectDate
          fieldLabel={fieldLabel}
          fieldValue={fieldValue}
          fieldOptions={fieldOptions}
          onSelect={onSelect}
          startDate={startDate}
          endDate={endDate}
          onSaveButton={handleDateRange} 
        />
      );

    default:
      break;
  }

  switch (fieldType) {
    case "select":
      return (
        <div>
          <ControlLabel>{fieldLabel}</ControlLabel>
          <CustomSelect
            initialValue={generateInitialOptions(fieldOptions, fieldValue)}
            value={fieldValue}
            multi={multi}
            onSelect={onSelect}
            options={fieldOptions}
            fieldLabel={fieldLabel}
            fieldValueOptions={fieldValueOptions}
          />
        </div>
      );
    case "input":
      return (
        <div>
          <ControlLabel>{fieldLabel}</ControlLabel>
          <ControlRange>
            {fieldAttributes?.map((attributes, index) => (
              <FormControl
                value={fieldValue?.[attributes.name]}
                onChange={e => handleInput(e)}
                {...attributes}
              />
            ))}
          </ControlRange>
        </div>
      );
    default:
      return <></>;
  }
};

export default ChartFormField;