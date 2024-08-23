import TextField from "@/components/InputField/TextField";

export default function Home() {
  return (
    <>
      <TextField 
        required={true} 
        name="input" 
        id="input" 
        label="Label Text"
        min={8}
        error="Message under the input field" />
    </>
  );
}
