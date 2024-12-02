import "./signup.css"
import FormAccount from "../../components/FormAccount/FormAccount"

function SignUp() {
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
        },
        {
            label: {
                value: "Confirm Password",
                forValue: "confirm-password"
            },
            input: {
                id: "signin-confirm-password",
                type: "password",
                name: "confirm-password",
                placeholder: "Password",
                required: true
            }
        }
    ]

    return (
        <div className="container-signup">
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
                    <p>Already have an account?! <a href="/account/login">Sign In</a></p>
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

export default SignUp