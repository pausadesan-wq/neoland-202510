import { Label } from './Label'
import { Input } from './Input'

export function Field({ alias, type, children, defaultValue, step, placeholder }) {
    return <div className="flex flex-col">
        <Label alias={alias}>{children}</Label>
        <Input alias={alias} type={type} defaultValue={defaultValue} step={step} placeholder={placeholder} />
    </div>
}
