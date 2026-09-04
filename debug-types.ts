import { defineQuery } from "next-sanity"
import type { ClientReturn, SanityQueries } from "@sanity/client"
const Q = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`)
type R = ClientReturn<typeof Q>
type Keys = keyof SanityQueries
type Has = typeof Q extends Keys ? true : false
type AssertTrue<T extends true> = T
type _has = AssertTrue<Has>
export type D = { r: R; has: Has; keysEmpty: [Keys] extends [never] ? true : false }
