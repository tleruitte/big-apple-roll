import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useMemo, useState } from "react";

import SurfaceButton from "src/components/buttons/surfaceButton";
import TextButton from "src/components/buttons/textButton";
import TextInput from "src/components/form/textInput";
import HeadLayout from "src/components/layouts/headLayout";
import assertNever from "src/helpers/assertNever";
import { currentDateInput } from "src/helpers/date";
import * as style from "src/pages/registration.module.css";

enum Page {
  PersonalInfo = "personalInfo",
  Waiver = "waiver",
  EmergencyContact = "emergencyContact",
  Submitted = "submitted",
}

const findPage = (currentPage: Page, offset: number): Page => {
  const values = Object.values(Page);
  const currentPageIndex = values.findIndex((page) => page === currentPage);
  if (currentPageIndex === -1) {
    return currentPage;
  }

  const pageIndex = currentPageIndex + offset;
  if (pageIndex < 0 || pageIndex >= values.length) {
    return currentPage;
  }

  return values[pageIndex];
};

export default function Registration(): React.JSX.Element {
  const { registration } = useStaticQuery<Queries.RegistrationQuery>(graphql`
    query Registration {
      registration: markdownRemark(
        fileName: { eq: "registration" }
        fileRelativeDirectory: { eq: "registration" }
      ) {
        html
      }
    }
  `);

  const [page, setPage] = useState(Page.PersonalInfo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [signature, setSignature] = useState("");
  const [date, setDate] = useState(currentDateInput());

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");

  const isValid = useMemo(() => {
    switch (page) {
      case Page.Submitted: {
        return false;
      }
      case Page.EmergencyContact: {
        if (!emergencyName || !emergencyEmail || !emergencyPhone || !emergencyRelation) {
          return false;
        }
      }
      // eslint-disable-next-line no-fallthrough
      case Page.Waiver: {
        if (!signature || !date) {
          return false;
        }
      }
      // eslint-disable-next-line no-fallthrough
      case Page.PersonalInfo: {
        if (!name || !email || !phone) {
          return false;
        }
        return true;
      }
      default: {
        assertNever(page);
        return false;
      }
    }
  }, [
    date,
    email,
    emergencyEmail,
    emergencyName,
    emergencyPhone,
    emergencyRelation,
    name,
    page,
    phone,
    signature,
  ]);

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
  }, []);

  const handleClear = useCallback(() => {
    setPage(Page.PersonalInfo);
    reset();
  }, [reset]);

  const handleBack = useCallback(() => {
    setPage(findPage(page, -1));
  }, [page]);

  const handleNext = useCallback(() => {
    const nextPage = findPage(page, 1);
    setPage(nextPage);

    if (nextPage === Page.Submitted) {
      reset();
    }
  }, [page, reset]);

  return (
    <>
      <h1>Registration</h1>
      <p>
        Welcome to Big Apple Roll 2024! All skaters are required to complete this registration form
        and sign the Release of Participation before attending any Big Apple Roll skates.
      </p>
      {(() => {
        switch (page) {
          case Page.PersonalInfo: {
            return (
              <>
                <h2>Personal Information</h2>
                <form className={style.form}>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>Full name:</span>
                    <TextInput type="text" value={name} onChange={setName} />
                  </label>

                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>Email:</span>
                    <TextInput type="email" value={email} onChange={setEmail} />
                  </label>

                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>Phone number:</span>
                    <TextInput type="tel" value={phone} onChange={setPhone} />
                  </label>
                </form>
              </>
            );
          }
          case Page.Waiver: {
            return (
              <>
                <h2>Release for Participation</h2>
                <div dangerouslySetInnerHTML={{ __html: registration?.html ?? "" }}></div>
                <form className={style.form}>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>Signature:</span>
                    <TextInput type="text" value={signature} onChange={setSignature} />
                  </label>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>Date:</span>
                    <TextInput type="date" value={date} onChange={setDate} />
                  </label>
                </form>
              </>
            );
          }
          case Page.EmergencyContact: {
            return (
              <>
                <h2>Emergency Contact</h2>
                <form className={style.form}>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>
                      Emergency contact full name:
                    </span>
                    <TextInput type="text" value={emergencyName} onChange={setEmergencyName} />
                  </label>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>
                      Emergency contact email:
                    </span>
                    <TextInput type="email" value={emergencyEmail} onChange={setEmergencyEmail} />
                  </label>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>
                      Emergency contact phone number:
                    </span>
                    <TextInput type="tel" value={emergencyPhone} onChange={setEmergencyPhone} />
                  </label>
                  <label className={style.label}>
                    <span className={clsx(style.labelLabel, style.isRequired)}>
                      Relationship to self:
                    </span>
                    <TextInput
                      type="text"
                      value={emergencyRelation}
                      onChange={setEmergencyRelation}
                    />
                  </label>
                </form>
              </>
            );
          }
          case Page.Submitted: {
            return (
              <>
                <h2>Thank you for registering!</h2>
                <p>
                  Your registration has been submitted successfully. We&apos;re looking forward to
                  skating together!
                </p>
              </>
            );
          }
          default: {
            assertNever(page);
            return null;
          }
        }
      })()}
      {page !== Page.Submitted ? (
        <div className={style.footer}>
          <TextButton onClick={handleClear}>Clear</TextButton>
          <div className={style.footerRight}>
            <SurfaceButton
              color="accent3"
              size="small"
              disabled={page === Page.PersonalInfo}
              onClick={handleBack}
            >
              Back
            </SurfaceButton>
            <SurfaceButton color="accent2" size="small" disabled={!isValid} onClick={handleNext}>
              {page === Page.EmergencyContact ? "Submit" : "Next"}
            </SurfaceButton>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function Head() {
  return <HeadLayout pageTitle="Registration" />;
}
