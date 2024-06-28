import React, { useEffect, useRef, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import FormTextInput from "../FormInputComponent/FormInput";

/* 
of course all the things work fine but the on pop up state of the browser will trigger the re render if user
regardless of if the user has interaceted before the validation logic will run in the use effect hook with the 
respective state depenedency as the way i stopped the validation to show initially with the initialRender state 
in components . as the initial render as ran before the on pop up user may not have a fresh experience while comming 
back after some time
*/

interface sendPostRequest {
  name: string;
  description: string;
  price: number;
  country: string;
  uid: number;
  rating: number;
  image: string;
}

function AddPost() {
  const intialRender = useRef<boolean>(true);
  const firstInput = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const [nameisValid, setNameIsValid] = useState<boolean | null>(null);
  const [descriptionIsValid, setDescriptionIsValid] = useState<boolean | null>(null);
  const [priceIsValid, setPriceIsValid] = useState<boolean | null>(null);
  const [countryIsValid, setCountryIsValid] = useState<boolean | null>(null);
  const [imageIsValid, setImageIsValid] = useState<boolean | null>(null);

  const fileReader = new FileReader();

  //use effect with empty dependency array acts like component did mount function
  useEffect(() => {
    console.log("initial render");
    firstInput.current?.focus();
  }, []);

  //this effect acts like component did update
  useEffect(() => {
    console.log("re-render");
  });

  useEffect(() => {
    if (intialRender.current) {
      intialRender.current = false;
      return;
    }
    if (image) {
      //the image has the data url
      //if validation needed it can be done here
      setImageIsValid(true);
    } else {
      setImageIsValid(false);
    }
  }, [image]);

  const validation = () => {
    nameValidation();
    priceValidation();
    countryValidation();
    productDescriptionValidation();
    if (imageIsValid == null) {
      console.log("image is valid is null");
      setImageIsValid(false);
    }
    return (
      nameValidation() &&
      priceValidation() &&
      countryValidation() &&
      productDescriptionValidation() &&
      imageIsValid
    );
  };

  const nameValidation = (): boolean => {
    if (productName.trim() == "") {
      setNameIsValid(false);
      return false;
    }
    setNameIsValid(true);
    return true;
  };

  const priceValidation = (): boolean => {
    if (/^[\d]+$/.test(price)) {
      setPriceIsValid(true);
      return true;
    }
    setPriceIsValid(false);
    return false;
  };

  const productDescriptionValidation = (): boolean => {
    if (productDescription.trim() == "") {
      setDescriptionIsValid(false);
      return false;
    }
    setDescriptionIsValid(true);
    return true;
  };

  const countryValidation = (): boolean => {
    if (country.trim() == "") {
      setCountryIsValid(false);
      return false;
    }
    setCountryIsValid(true);
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      //need to convert the file to base 64 for image transmission
      if (!file.type.startsWith("image/")) {
        setImageIsValid(false);
        return;
      }
      fileReader.readAsDataURL(file);
    }
    setImageIsValid(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    //react batches the state upates as in a way that all the event handler logic
    //realated to the current snapshot of the state runs so the event handlers cant rely
    //on state that is changed in the this handler itself
    e.preventDefault();
    console.log("submit clicked");
    if (validation()) {
      createPostRequest({
        name: productName,
        description: productDescription,
        price: parseInt(price),
        country: country,
        uid: 1,
        rating: 0,
        image: image as string,
      });
    }
  };

  fileReader.onload = () => {
    const base64 = fileReader.result as string;
    setImage(base64);
  };

  fileReader.onloadend = () => {
    console.log("finished reading the image");
  };

  fileReader.onerror = () => {
    console.log("error has occured while reading the image");
  };

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <ItemCard
          itemName={nameisValid ? productName : "Item Name"}
          itemPrice={priceIsValid ? price : "Item Price"}
          itemRating={0}
          country={countryIsValid ? country : "country"}
          status="available"
          image={image}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <FormTextInput
          type="input"
          instanceRef={firstInput}
          className="mb-1 p-1"
          state={productName}
          setState={setProductName}
          isValid={nameisValid}
          setIsValid={setNameIsValid}
          label="Product Name"
          validator={nameValidation}
        />
        <FormTextInput
          type="textArea"
          isValid={descriptionIsValid}
          setIsValid={setDescriptionIsValid}
          className=" mb-1 p-1"
          state={productDescription}
          setState={setProductDescription}
          label="Product Description"
          validator={productDescriptionValidation}
        />
        <FormTextInput
          type="input"
          isValid={priceIsValid}
          setIsValid={setPriceIsValid}
          state={price}
          setState={setPrice}
          className=" mb-1 p-1"
          label="Price"
          validator={priceValidation}
        />
        <FormTextInput
          type="input"
          className="mb-1 p-1"
          isValid={countryIsValid}
          setIsValid={setCountryIsValid}
          state={country}
          setState={setCountry}
          label="Country"
          validator={countryValidation}
        />
        <div>
          <input
            type="file"
            className={`mb-1 p-1 form-control ${
              imageIsValid == null ? "" : imageIsValid ? "is-valid" : "is-invalid"
            }`}
            onChange={handleImageChange}
            accept="image/*"
          />
          <div
            className={
              imageIsValid == null
                ? "opacity-0"
                : imageIsValid
                ? "valid-feedback"
                : "invalid-feedback"
            }
          >
            {imageIsValid ? "valid Image" : "invalid image"}
          </div>
        </div>

        <button className="btn btn-primary">Create Post</button>
      </form>
    </div>
  );
}

async function createPostRequest(data: sendPostRequest) {
  console.log(data);
  const responseJson = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (responseJson.ok) {
    console.log("submission sucessfull");
  } else {
    console.log("submission unsuccessfull");
  } 
  const response = await responseJson.json();
  console.log(response);
}

export default AddPost;
