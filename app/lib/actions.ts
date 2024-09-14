"use server"

// import { signIn } from 'auth';
// import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("🚀 ~ formData:", { ...formDataObject, redirect: true, callbackUrl: '/' });

    // const result = await signIn('credentials', {
    //   redirect: false,
    //   ...formDataObject,
    // });
    // console.log("result" + result)
    // if (result != "") {
    //   return { success: true, message: 'Login REALIZADO COM SUCESSO!' };
    // } else {
    //   return { success: false, message: 'Invalid credentials.' };
    // }
  } catch (error) {
    if (error ) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid credentials.' };
        default:
          return { success: false, message: 'Something went wrong.' };
      }
    }
    throw error;
  }
}
