// // WizardContext.tsx
// import React, { createContext, useState } from 'react';

// interface WizardContextValue<T> {
//   currentStep: number;
//   setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
//   formData: T;
//   setFormData: React.Dispatch<React.SetStateAction<T>>;
// }

// const WizardContext = createContext<WizardContextValue<any> | undefined>(undefined);

// const WizardProvider = <T extends {}>({ children }: { children: React.ReactNode }) => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [formData, setFormData] = useState<T>({} as T);

//   const value: WizardContextValue<T> = {
//     currentStep,
//     setCurrentStep,
//     formData,
//     setFormData,
//   };

//   return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
// };

// export { WizardContext, WizardProvider };

// // useWizardForm.tsx
// import { useContext } from 'react';

// const useWizardForm = <T extends {}>() => {
//   const context = useContext(WizardContext);

//   if (!context) {
//     throw new Error('useWizardForm must be used within a WizardProvider');
//   }

//   return context as WizardContextValue<T>;
// };

// export default useWizardForm;

// const {} = useWizardForm()
