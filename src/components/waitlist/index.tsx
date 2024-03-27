// import { useWaitlistWidgetEditor } from "../providers/waitlist-widget";
// import { cn, getClassName } from "@/lib/utils";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Form } from "../ui/form";
// import { z } from "zod";

// function LiveWaitlistWidget() {
//   const { widgetContent } = useWaitlistWidgetEditor();
//   const questionsObj: Record<
//     string,
//     z.ZodEnum<[string, ...string[]]> | z.ZodString
//   > = {};
//   const s = widgetContent?.questions.map((question) => {
//     if (question.type === "SELECT") {
//       questionsObj[question.label] = z.enum(
//         question.options as [string, ...string[]],
//       );
//     } else if (question.type === "TEXT_INPUT") {
//       questionsObj[question.label] = z.string();
//     }
//   });

//   const FormSchema = z.object({
//     email: z.string(),
//   });
//   return (
//     <Card className="prose flex items-center justify-center">
//       <CardHeader>
//         <CardTitle className={getClassName(widgetContent?.title.styles)}>
//           {widgetContent?.title.innerText}
//         </CardTitle>
//         <CardDescription
//           className={getClassName(widgetContent?.description.styles)}
//         >
//           {widgetContent?.description.innerText}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>{/* <Form></Form> */}</CardContent>
//     </Card>
//   );
// }

// export default LiveWaitlistWidget;
