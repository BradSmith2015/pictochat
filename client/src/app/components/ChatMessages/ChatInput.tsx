
interface Props {
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value: string
}

export const ChatInput: React.FC<Props> = ({ handleChange, value }) => {
    return (
        <div>
            <input value={value} onChange={handleChange} />
        </div>
    )
}