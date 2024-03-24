import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ITask from '../interfaces/task.interface';
import { tasks } from '../(data)/data';
import uuid from 'react-native-uuid';

const FormTaskScreen = () => {
	const router = useRouter();
	const parameters = useLocalSearchParams();
	const [tfTitle, setTfTitle] = useState('');
	const [tfDescription, setTfDescription] = useState('');


	const onSave = () => {
		const newTask: ITask = {
			id: uuid.v4().toString(),
			title: tfTitle,
			description: tfDescription,
		};
		tasks.push(newTask);
	};

	const onUpdate = () => {
		const index = tasks.findIndex((task) => task.id === parameters.id);
		const updateTask = tasks[index];
		updateTask.title= tfTitle;
		updateTask.description = tfDescription;
		tasks[index] = updateTask;
	};

	const onHandleForm = () => {
		if (parameters.id != '') {
			onUpdate();
		} else {
			onSave();
		}
		router.back();
	};
	const init = () => {
		if (parameters.id != '') {
			const task: ITask | undefined = tasks.find(
				(task) => task.id === parameters.id
			);
			setTfTitle(task!.title);
			setTfDescription(task!.description);
			
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<View className="p-2 bg-gray-950 h-screen">
			<Ionicons
				onPress={() => {
					router.back();
				}}
				color={'white'}
				size={30}
				name="chevron-back-outline"
			></Ionicons>
			<Text className="text-white font-bold text-2xl my-4">
				{parameters.id != '' ? 'Editar Tarea' : 'Crear Tarea'}
			</Text>
			<TextInput
				className="rounded-md p-3 bg-gray-200 mb-4"
				onChangeText={setTfTitle}
				value={tfTitle}
				placeholder="Nombre"
			></TextInput>

			<TextInput
				className="rounded-md p-3 bg-gray-200 mb-4"
				onChangeText={setTfDescription}
				value={tfDescription}
				placeholder="Descripción"
			></TextInput>
		
			<TouchableOpacity
				onPress={onHandleForm}
				className="bg-yellow-500 rounded-md p-4"
			>
				<Text className="text-black font-semibold text-center">Guardar</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FormTaskScreen;
