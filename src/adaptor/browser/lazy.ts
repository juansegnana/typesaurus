/**
 * Lazy browser Firestore adaptor.
 */

import { getAll } from '../utils'

export default async function adaptor() {
  // const { default: firebase } = await import('firebase/app')
  const { 
    getFirestore, 
    DocumentReference, 
    Timestamp, 
    FieldPath, 
    FieldValue, 
    DocumentSnapshot, 
  } = await import('firebase/firestore')

  const firestore = getFirestore()
  // At the moment, the browser's Firestore adaptor doesn't support getAll.
  // Get rid of the fallback when the issue is closed:
  // https://github.com/firebase/firebase-js-sdk/issues/1176
  if (!('getAll' in firestore)) Object.assign(firestore, { getAll })

  return {
    firestore,
    consts: {
      DocumentReference: DocumentReference,
      Timestamp: Timestamp,
      FieldPath: FieldPath,
      FieldValue: FieldValue
    },
    // @ts-ignore
    getDocMeta: (snapshot: DocumentSnapshot) => ({
      fromCache: snapshot.metadata.fromCache,
      hasPendingWrites: snapshot.metadata.hasPendingWrites
    })
  }
}

export function injectAdaptor() {
  throw new Error(
    'Injecting adaptor is not supported in the browser environment'
  )
}
