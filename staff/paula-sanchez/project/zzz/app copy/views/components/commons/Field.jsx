import { Label } from './Label'
import { Input } from './Input'

export function Field({ alias, type, children }) {
    return <div className="flex flex-col">
        <Label alias={alias}>{children}</Label>
        <Input alias={alias} type={type} />
    </div>
}