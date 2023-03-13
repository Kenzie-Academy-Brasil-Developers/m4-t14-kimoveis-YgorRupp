import { z } from "zod";
import { addressSchema, createAddressSchema } from "../schemas/address.schemas";

type iAddress = z.infer<typeof addressSchema>;
type iCreateAddress = z.infer<typeof createAddressSchema>;

export { iAddress, iCreateAddress };
