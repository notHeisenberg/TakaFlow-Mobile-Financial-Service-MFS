

import PropTypes from 'prop-types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export function SelectDemo({ setSelectedRole }) {
    return (
        <Select onValueChange={(value) => { setSelectedRole(value) }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Register As</SelectLabel> */}
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

SelectDemo.propTypes = {
    setSelectedRole: PropTypes.func.isRequired
}