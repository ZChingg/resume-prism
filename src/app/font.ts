import { Poppins, Lato} from 'next/font/google'
 
export const poppins = Poppins({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
  });
 
export const lato = Lato({
    weight: ["400", "700", "900"],
    subsets: ["latin"],
  });