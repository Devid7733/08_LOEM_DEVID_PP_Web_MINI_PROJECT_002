export const registerSchema = z
.object({
    firstName : z.string().min(2, "first name name must be at least 2 characters"),
    lastName : z.string().min(2, "last name name must be at least 2 characters"),
    email:z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    birthDate: z.string().min(1, "Birthdate is required"),

})
.refine((data) => data.password == data.confirmPassword,{
    message: "Passwords doesn't match",
    path:[confirmPassword],

});
