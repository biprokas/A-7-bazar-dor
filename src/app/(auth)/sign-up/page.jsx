"use client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import React from "react";

const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert("Form submitted successfully!");
  };
  return (
    <div>
      {" "}
      <Form className="w-full max-w-96 " onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>অ্যাকাউন্ট তৈরি করুন</Fieldset.Legend>
          <Description>
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </Description>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>নাম</Label>
              <Input placeholder="bipro" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>ইমেইল</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="you@example.com">
              <Label>পাসওয়ার্ড</Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="you@example.com">
              <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" />
              <FieldError />
            </TextField>
          </FieldGroup>
          <Fieldset.Actions>
            <Button type="submit">অ্যাকাউন্ট তৈরি করুন</Button>
            <p>or</p>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default SignUp;
