import React from 'react'
import {FormProvider as Form} from "react-router-dom"

const FormProvider = ({children, onSubmit, methods}) => {
  return (
    <Form {...methods}>

    </Form>
  )
}

export default FormProvider