import React from "react";
import moment from "moment";
import { IDateContext } from "./types";

const defaultValues: IDateContext = {
  date: new Date(),
  setDate() {},
};

const DateContext = React.createContext<IDateContext>(defaultValues);

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = React.useState<Date>(moment().toDate());

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
