import React from "react";
import propertyKeys from "../constantKeys/propertyConstKeys";
import '../loginRegister/passwordStrength.css';
function Passwordchecks(props) {
    return (
        <div className="tooltip">
            <div className="tooltiptext">
                <p className={ props.upperCaseFlag}>{propertyKeys.passwordCheck.upperCase}</p>
                <p className={ props.loweCaseFlag }>{propertyKeys.passwordCheck.lowerCase}</p>
                <p className={ props.specialCharacterFlag}>{propertyKeys.passwordCheck.specialCharacter}</p>
                <p className={ props.numberFlag}>{propertyKeys.passwordCheck.numberFlag}</p>
                <p className={ props.lengthFlag}>{propertyKeys.passwordCheck.lengthFlag}</p>
            </div>
        </div>
    )
}
export default Passwordchecks;