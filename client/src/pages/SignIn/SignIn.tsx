import "./signin.css"

import FormAccount from "../../components/FormAccount/FormAccount"

function SignIn() {
    const formGroups = [
        {
            label: {
                value: "E-mail",
                forValue: "email"
            },
            input: {
                id: "signin-email",
                type: "text",
                name: "email",
                placeholder: "E-mail",
                required: true
            }
        },
        {
            label: {
                value: "Password",
                forValue: "password"
            },
            input: {
                id: "signin-password",
                type: "password",
                name: "password",
                placeholder: "Password",
                required: true
            }
        }
    ]

    return (
        <div className="container-signin">
            <div className="content-section-form">
                <div className="section-title">
                    <h1>Wellcome</h1>
                </div>
                <div className="section-form">
                    <FormAccount 
                        groups={formGroups} 
                        typeButton={"Submit"} 
                        valueButtom={"Enter"} 
                    />
                </div>
                <div className="section-action-account">
                    <p>Don't have an account? <a href="/account/register">Sign Up</a></p>
                </div>
            </div>
            <div className="content-section-graph">
                <div className="section-logo">
                    <img src="../../assets/logo_white_transparent.png" alt="Logo" />
                </div>
                <div className="section-logo-info">
                    <p>PetCare+ : Vaccination, Bath, and Grooming System</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn