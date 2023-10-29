import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Divider, Heading, HStack, Image, Input, Menu, MenuButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
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

  const ref_first_name = useRef(null); refs['ref_first_name'] = ref_first_name;
  const ref__last_name = useRef(null); refs['ref__last_name'] = ref__last_name;

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
  <HStack sx={{"position": "fixed", "width": "100%", "top": "0px", "zIndex": "5", "paddingX": "2em"}}>
  <HStack>
  <Image src={`/budget-line-icon-logo-illustration-free-vector.jpg`} sx={{"width": "50px"}}/>
  <Heading>
  {`FuckThis`}
</Heading>
</HStack>
  <Spacer/>
  <Menu>
  <MenuButton>
  {`Menu`}
</MenuButton>
</Menu>
</HStack>
  <Image src={`/image-2.svg`} sx={{"width": "250px", "height": "350"}}/>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("form_state.handle_submit", {form_data:{"_last_name": getRefValue(ref__last_name), "first_name": getRefValue(ref_first_name)}})], (_e0))}>
  <VStack>
  <Input id={`first_name`} placeholder={`             First Name`} ref={ref_first_name} type={`text`}/>
  <Input id={`  last_name`} placeholder={`             Last Name`} ref={ref__last_name} type={`text`}/>
  <Button onClick={(_e) => addEvents([Event("_redirect", {path:`/budget_page`,external:false})], (_e))} size={`sm`} sx={{"bg": "lightblue", "color": "black"}}>
  {`Submit`}
</Button>
</VStack>
</Box>
  <Divider/>
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
