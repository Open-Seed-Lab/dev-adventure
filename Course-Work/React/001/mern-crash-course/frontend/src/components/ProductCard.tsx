import {
	Box, Heading, HStack, VStack, IconButton, Image, Input, Text, Button,
	Modal, ModalBody, ModalCloseButton, ModalHeader, ModalFooter, ModalOverlay,
	useColorModeValue, useDisclosure, useToast,
	ModalContent
} from '@chakra-ui/react'
import { IProduct } from '../models/product.model'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useState } from 'react';

export default function({ product }: { product: IProduct }) {
	const textColor = useColorModeValue('gray.600', 'gray.200')
	const bg = useColorModeValue('white', 'gray.800')
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { name, price, image, _id } = product;
	const toast = useToast();
	const { deleteProduct, updateProduct } = useProductStore();
	const [updatedProduct, setUpdatedProduct] = useState<IProduct>(product);
	const handleDelete = async (prodId: string) => {
		const { success, message } = await deleteProduct(prodId);
		toast({
			title: success ? 'Success' : 'Error',
			description: message,
			status: success ? 'success' : 'error',
			isClosable: true,
			duration: 3000,
			position: 'top-right'
		});
	}
	const handleUpdate = async () => {
		const { success, message } = await updateProduct(updatedProduct);
		toast({
			title: success ? 'Success' : 'Error',
			description: message,
			status: success ? 'success' : 'error',
			isClosable: true,
			duration: 3000,
			position: 'top-right'
		});
		onClose();
	}
	return <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }} backgroundColor={bg}>
		<Image src={image} alt={name} h={48} w={'full'} objectFit={'cover'} />
		<Box p={4}>
			<Heading as={'h3'} size={'md'} mb={2}>{name}</Heading>
			<Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
				{price}
			</Text>
			<HStack>
				<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={'blue'} aria-label={'open'} />
				<IconButton icon={<DeleteIcon />} onClick={() => handleDelete(_id!)} colorScheme={'red'} aria-label={'delete'} />
			</HStack>
		</Box>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={e => setUpdatedProduct(np => ({
									...np,
									name: e.target.value
								}))}
							/>
							<Input
								placeholder="Product Price"
								name="price"
								value={updatedProduct.price}
								onChange={e => setUpdatedProduct(np => ({
									...np,
									price: parseInt(e.target.value ?? 0)
								}))}
							/>
							<Input
								placeholder="Product image"
								name="image"
								value={updatedProduct.image}
								onChange={e => setUpdatedProduct(np => ({
									...np,
									image: e.target.value
								}))}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleUpdate}>Update</Button>
						<Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	</Box>
}
