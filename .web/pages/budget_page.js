import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Divider, Heading, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextHead from "next/head"



export default function Component() {
  const form_state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])

  const ref_query = useRef(null); refs['ref_query'] = ref_query;
  const ref_Cost = useRef(null); refs['ref_Cost'] = ref_Cost;
  const ref_first_name = useRef(null); refs['ref_first_name'] = ref_first_name;

  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack>
  <Text>
  {`Expenses`}
</Text>
  <Input id={`query`} placeholder={`Type to Search...`} ref={ref_query} type={`text`}/>
  <Divider/>
  <TableContainer>
  <Table variant={`striped`}>
  <Thead>
  <Tr>
  <Th>
  {`Name`}
</Th>
  <Th>
  {`Cost`}
</Th>
</Tr>
</Thead>
  <Tbody>
  <Tr>
  <Td>
  {`Books`}
</Td>
  <Td>
  {`30`}
</Td>
</Tr>
  <Tr>
  <Td>
  {`Crack`}
</Td>
  <Td>
  {`5`}
</Td>
</Tr>
  <Tr>
  <Td>
  {`Food`}
</Td>
  <Td>
  {`20`}
</Td>
</Tr>
  <Tr>
  <Td>
  {`Transport`}
</Td>
  <Td>
  {`60`}
</Td>
</Tr>
</Tbody>
</Table>
</TableContainer>
  <Divider/>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("form_state.handle_submit", {form_data:{"first_name": getRefValue(ref_first_name), "Cost": getRefValue(ref_Cost)}})], (_e0))}>
  <VStack>
  <Heading>
  {`Add Expenses`}
</Heading>
  <Text>
  {JSON.stringify(form_state.form_data)}
</Text>
  <Input id={`first_name`} placeholder={`First Name`} ref={ref_first_name} type={`text`}/>
  <NumberInput onChange={(_e0) => addEvents([Event("form_state.set_number", {value:_e0})], (_e0))}>
  <NumberInputField id={`Cost`} ref={ref_Cost}/>
  <NumberInputStepper>
  <NumberIncrementStepper/>
  <NumberDecrementStepper/>
</NumberInputStepper>
</NumberInput>
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
</Box>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
