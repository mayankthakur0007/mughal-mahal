import * as Yup from "yup";

export const LoanSchema = Yup.object({
  loanAmount: Yup.number().required("Please enter loan amount"),
  purpose: Yup.string().required("Please enter loan popose"),
  startDate: Yup.string().required("Please enter loan start date"),
  endDate: Yup.string().required("Please enter loan end date"),
});
export const BranchSchema = Yup.object({
  code: Yup.string().required("Please enter branch code"),
  name: Yup.string().required("Please enter branch name"),
  contactEmail: Yup.string().required("Please enter branch email"),
  contactPhoneNumber: Yup.string().required("Please enter branch phoneNo"),
});
export const DesignationSchema = Yup.object({
  name: Yup.string().required("Please enter designation name"),
});
export const StaffSchema = Yup.object({
  name: Yup.string().required("Please enter Staff name"),
});
export const MessageSchema = Yup.object({
  email: Yup.string().required("Please enter Email"),
  phone_number: Yup.string().required("Please enter Phone Number"),
  message: Yup.string().required("Please enter Message"), 
  subject:Yup.string().required("Please enter Subject")
});

export const LeaveSchema = Yup.object({
  kuwaitContactNumber: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  totalDaysAvailed: Yup.string().required("Required"),
  isReadyToPayTicketVariables: Yup.string().required("Required"),
  approvedByHR: Yup.string().required("Required"),
  approvedByHR: Yup.string().required("Required"),
});

export const LoginSchema = Yup.object({
  civil_id: Yup.string().min(10, ({ min }) => `Civil Id must be ${min} Digits`).max(10, ({ max }) => `Civil Id must be ${max} Digits`).required("Required"),
  password: Yup.string().min(8, () => `Password is too sort`).max(16, () => `Password is too long`).required("Required"),
});

export const StudyMaterialSchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please enter description"),
  mediaid: Yup.array().min(1, "Please select attachment"),
  categories: Yup.array().min(1, "Please pick categories"),
  assignedType : Yup.string().required("Please select assinged by role or user"),
  assingedTo : Yup.array().min(1, "Please select roles or users"),
  attachedQuestionnaires: Yup.array().min(1, "Please select questionnaires"),
});

export const QuestionnaireSchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please enter description"),
  assignedType : Yup.string().required("Please select assinged by role or user"),
  assingedTo : Yup.array().min(1, "Please select roles or users"),
  questions : Yup.array().min(1, "Please select roles or users")
});

export const QuestionSchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  mediaid: Yup.array().min(1, "Please select attachment"),
  options : Yup.array().min(1, "Please select Options"),
  correctOption : Yup.string().required("Please select Correct Option"),
  pointsOnCorrentAns : Yup.number().required("Please Enter Points on Correct Answer")
});

export const MoMSchema = Yup.object({
  subject: Yup.string().required("Required"),
  hosted_by: Yup.string().required("Required"),
  branch: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});