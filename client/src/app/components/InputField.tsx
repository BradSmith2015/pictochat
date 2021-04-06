
interface Props {
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value: string
}

export const InputField: React.FC<Props> = ({ handleChange, value }) => {
    return (
        <div>
            <input value={value} onChange={handleChange} />
        </div>
    )
}