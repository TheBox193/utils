/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Controller } from "react-hook-form";

const identity = <T,>(x: T): T => x;

export type ControlledFieldProps = {
  name: string;
  defaultValue?: any;
  Component: React.FunctionComponent<any>;
  ComponentProps?: Record<string, unknown>;
  onChangeTransform?: (x: any) => any;
  valueTransform?: (x: any) => any;
};

const ControlledField: React.FC<ControlledFieldProps> = ({
  name,
  defaultValue,
  Component,
  ComponentProps,
  onChangeTransform = identity,
  valueTransform = identity,
}) => {
  return (
    <Controller
      name={name}
      {...(defaultValue && { defaultValue })}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error },
      }) => (
        <Component
          {...ComponentProps}
          onChange={(x: unknown) => onChange(onChangeTransform(x))}
          onBlur={onBlur}
          value={valueTransform(value)}
          inputRef={ref}
          error={invalid}
          helperText={error?.message ? error.message : null}
        />
      )}
    />
  );
};

export default ControlledField;
