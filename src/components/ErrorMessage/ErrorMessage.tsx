import { Button, Center, Text } from '@chakra-ui/react'

type ErrorMessageProps = {
  onRetry?: () => void
  message?: string
}
const ErrorMessage = ({
  onRetry = () => undefined,
  message,
}: ErrorMessageProps) => {
  return (
    <Center width={'full'} justifyContent="center">
      <Center
        borderWidth="1px"
        borderRadius={10}
        borderColor="red.500"
        height={48}
        flexDirection="column"
        padding={10}
      >
        <Text paddingBottom={2.5}>{message || `There has been an error.`}</Text>

        <Button onClick={() => onRetry()} colorScheme="blue">
          Retry
        </Button>
      </Center>
    </Center>
  )
}

export default ErrorMessage
