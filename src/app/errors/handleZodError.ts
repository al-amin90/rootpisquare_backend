import { ZodError } from "zod";

const handleZodHandler = (err: ZodError) => {
  const errorSources = err.issues?.map((issue) => {
    return {
      path: (issue?.path[issue.path.length - 1] ?? "root") as string | number,
      message: issue?.message,
    };
  });

  const statusCode = 500;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodHandler;
