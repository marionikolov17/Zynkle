// eslint-disable-next-line react/prop-types
export default function FormErrorMessage({ className, message }) {
    return (
        <p className={"text-sm text-red-500 " + className}>{message}</p>
    )
}