import React, { useState } from 'react'
import AuthLayout from '../../Components/AuthLayout'
import { Box, Grid } from '@mui/material'
import CommonTextField from '../../Components/Common/Fields/TextField'
import { Regex } from '../../Utils/regex'
import TextLabel from '../../Components/Common/Fields/TextLabel'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { useAppContext } from '../../Context/context'
import axios from "../../APiSetUp/axios";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Assets from '../../Components/Common/ImageContainer'


const Register = () => {
    const navigate = useNavigate();

    //States 
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { OnUpdateError, toggleLoader } = useAppContext();

    //Validation
    const handleValidation = () => {
        let errors = {}
        let formIsValid = true
        if (!data?.name) {
            formIsValid = false
            errors['name'] = 'Please enter name.'
        }
        if (!data?.email) {
            formIsValid = false;
            errors["email"] = "Please enter email.";
        } else if (!data?.email?.match(Regex.emailRegex)) {
            formIsValid = false;
            errors["invalidEmail"] = "* Invalid email Address";
        }
        if (!data?.password) {
            formIsValid = false;
            errors['password'] = 'Please enter password.';
        } else if (data.password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password must be at least 8 characters.';
        }
        if (!data?.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "Please enter confirmPassword.";
        } else if (data?.password !== data?.confirmPassword) {
            formIsValid = false;
            errors["passwordsMatch"] = "Password do not match !";
        }
        setError(errors)
        return formIsValid
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        if (isSubmit) {
            handleValidation()
        }
    }
    const handleLoginClick = () => {
        setIsSubmit(true)
        if (handleValidation()) {
            toggleLoader();
            axios.post("signUp", {
                name: data?.name,
                email: data?.email,
                password: data?.password
            }).then((res) => {
                console.log("res",res);
                if (res?.data?.message) {
                    
                    swal(res?.data?.message, {
                        icon: "success",
                        timer: 5000,
                    })
                    navigate("/login")
                }
                toggleLoader();
            }).catch((err) =>{
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
        }
    }

return (
    <AuthLayout logo={<Assets height={"70px"} src={"/assets/icons/logo.png"} absolutePath={true} />} login={"Register"} account={'Please register to your account'} newAccount={'Already have an account?'} register={'Login here'}>
        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={10} sm={10} md={10} lg={10} style={{ marginTop: '20px' }}>
                <CommonTextField
                    placeholder={"Name"}
                    type={'name'}
                    value={data?.name}
                    name='name'
                    onChange={(e) => handleChange(e, false)} />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={error?.name} />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <CommonTextField
                    placeholder={"Email id"}
                    type={'email'}
                    value={data?.email}
                    name='email'
                    onChange={(e) => handleChange(e, false)} />
                <TextLabel fontSize={"12px"} color={"red"} title={!data?.email ? error?.email : ""} />
                <TextLabel fontSize={"12px"} color={"red"} title={data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <CommonTextField
                    placeholder={"Password"}
                    showPasswordToggle
                    type={'password'}
                    value={data?.password}
                    name='password'
                    onChange={(e) => handleChange(e, false)} />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={error?.password} />

            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <CommonTextField
                    placeholder={"Confirm Password"}
                    showPasswordToggle
                    type={'password'}
                    value={data?.confirmPassword}
                    name='confirmPassword'
                    onChange={(e) => handleChange(e, false)} />
                <TextLabel fontSize={"12px"} color={"red"} title={!data?.confirmPassword ? error?.confirmPassword : ""} />
                <TextLabel fontSize={"12px"} color={"red"} title={data?.password === data?.confirmPassword ? "" : error?.passwordsMatch} />
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    <CommonButton
                        width={'200px'}
                        text="Register"
                        type="submit"
                        onClick={handleLoginClick}
                    />
                </Box>
            </Grid>
        </Grid>
    </AuthLayout>
)
}

export default Register