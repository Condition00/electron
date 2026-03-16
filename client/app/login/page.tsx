import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function page() {
    return(
        <div className="flex items-center justify-around min-h-screen bg-color5">
            <form className="w-full max-w-md bg-white border-2 border-white  rounded-md p-6">
            <FieldSet >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="electron@gmail.com" />
                        <FieldDescription>Enter your email address</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="email" type="password" placeholder="*******" />
                        <FieldDescription>Enter your password</FieldDescription>
                    </Field>
                    <Field>
                        <Button type="submit">
                            Login
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
            </form>
        </div>
    );
}