import useDishData from './useDishData';
import useAwsS3 from '@/base/hooks/useAwsS3';
import { Dish } from '@/types/@mk/entity/dish';
import { DishStatus } from '@/types/@mk/enum/dishStatus';
import { toast } from 'react-toastify';

export interface DishAddForm {
    name?: string,
    description? : string,
    imageUrl? : string,
    imageFile?: File,
    kitchenId?: string
}

const useDishForm = () => {
    const {
       createDish: {
        isLoading: isCreatingDish,
        mutateAsync : createDishFunc
       },
       updateDish: {
        isLoading : isUpdatingDish,
        mutateAsync: updateDishFunc
       }
      } = useDishData();
      const { putObject } = useAwsS3();
    //   const CustomerSchema = Yup.object().shape({
    //     fullname: Yup.string().max(255).required("Name is required"),
    //     phone: Yup.string()
    //       .required("Phone is required")
    //       .max(16, "Must be a valid phone")
    //       .matches(/^\+[\d+]|[\d+]*$/, "Must be a valid phone"),
    //     email: Yup.string()
    //       .max(255)
    //       .required("Email is required")
    //       .email("Must be a valid email"),
    //     autoPassword: Yup.boolean(),
    //     birthday: Yup.string().required(),
    //     role: Yup.string().required(),
    //     password: Yup.string().when("autoPassword", (autoPassword, schema) => {
    //       if (!autoPassword[0]) {
    //         return schema.required();
    //       } else {
    //         return schema.notRequired();
    //       }
    //     }),
    //     confirmPassword: Yup.string().when(
    //       ["autoPassword", "password"],
    //       ([autoPassword, password], schema) => {
    //         {
    //           console.log("Auto Password in yup => ", autoPassword);
    //           console.log("Password in yup => ", password);
    
    //           if (!autoPassword && !!password) {
    //             return schema
    //               .required("Confirm Password is required")
    //               .oneOf(
    //                 [Yup.ref("password"), null],
    //                 "Confirm Password does not match"
    //               );
    //           } else {
    //             return schema;
    //           }
    //         }
    //       }
    //     ),
    //     status: Yup.string().required(),
    //   });
      const createDishHandler = async (formValues: DishAddForm) => {
        const {
         imageFile,
         description,
         name,
         kitchenId
        } = formValues;
        let objectPath = null;
        if (imageFile) {
          objectPath = await putObject({
            object: imageFile,
            path: `kitchen/${kitchenId??"common"}/dish/`,
          });
          console.log("Uploaded object path => ", objectPath);
        }
        const newDish: Dish = {
          name: name,
          description,
          imageUrl:objectPath,
          kitchenId,
          status: DishStatus.Active
        };

        const res = await createDishFunc(newDish);
        if(res && res.statusCode == "OK"){
          toast.success("Add new dish successfully!");
          return res;
        }else {
          toast.success("There is some error try again later!");
          return null
        }
      };
      
      const updateDishHandler = async (formValues: DishAddForm, oldDish: Dish) => {
        const {
         imageFile,
         description,
         name,
         kitchenId
        } = formValues;
        let objectPath = null;
        if (imageFile) {
          objectPath = await putObject({
            object: imageFile,
            path: `kitchen/${kitchenId??"common"}/dish/`,
          });
          console.log("Uploaded object path => ", objectPath);
        }
        const newDish: Dish = {
          name: name,
          description,
          imageUrl:objectPath?? oldDish?.imageUrl,
          kitchenId,
          status: DishStatus.Active,
          id : oldDish?.id
        };

        const res = await updateDishFunc(newDish);
        if(res && res.statusCode == "OK"){
          toast.success("Add new dish successfully!");
          return res;
        }else {
          toast.success("There is some error try again later!");
          return null
        }
      };
      
      return {
        createDishHandler,
        isCreatingDish,
        updateDishHandler,
        isUpdatingDish
      };
}

export default useDishForm