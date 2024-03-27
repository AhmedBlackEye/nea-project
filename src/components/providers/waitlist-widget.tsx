// "use client";

// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import { WidgetContent } from "@/types/widget";

// export const WaitlistWidgetEditorContext = createContext<{
//   widgetContent: WidgetContent | null;
//   setWidgetContent: Dispatch<SetStateAction<WidgetContent>>;
// }>({
//   widgetContent: null,
//   setWidgetContent: () => undefined,
// });

// const WaitlistWidgetEditorProvider = ({
//   children,
//   initialState,
// }: {
//   children: ReactNode;
//   initialState: WidgetContent;
// }) => {
//   const [widgetContent, setWidgetContent] =
//     useState<WidgetContent>(initialState);
//   return (
//     <WaitlistWidgetEditorContext.Provider
//       value={{
//         widgetContent,
//         setWidgetContent,
//       }}
//     >
//       {children}
//     </WaitlistWidgetEditorContext.Provider>
//   );
// };

// export const useWaitlistWidgetEditor = () => {
//   const context = useContext(WaitlistWidgetEditorContext);
//   if (!context) {
//     throw new Error("useEditor Hook must be used within the editor Provider");
//   }
//   return context;
// };

// export default WaitlistWidgetEditorProvider;
