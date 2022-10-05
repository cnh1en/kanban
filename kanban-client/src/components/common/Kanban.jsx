/* eslint-disable react/prop-types */
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
	Box,
	Button,
	Card,
	Divider,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import sectionApi from '../../api/sectionApi';
import taskApi from '../../api/taskApi';
import '../../css/custom-scrollbar.css';
import {
	addSection,
	removeSection,
	setSections,
} from '../../redux/features/sectionSlice';
import { addTask, setTasks } from '../../redux/features/taskSlice';

let timer;

// eslint-disable-next-line react/prop-types
const Kanban = ({ data, boardId, boards }) => {
	const dispatch = useDispatch();
	const sections = useSelector((state) => state.section.value);
	const tasks = useSelector((state) => state.task.value);

	const createSection = async () => {
		try {
			const { section } = await sectionApi.createSection(boardId);
			dispatch(addSection(section));
			setSections([section, ...sections]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteSection = async (id) => {
		dispatch(removeSection(id));
		await sectionApi.deleteSection(id);
	};

	const updateTitleSection = async (id, index, title) => {
		clearTimeout(timer);

		const newSections = [...sections];
		newSections[index] = { ...newSections[index], title };

		dispatch(setSections(newSections));
		timer = setTimeout(async () => {
			await sectionApi.updateSection(id, {
				title,
			});
		}, 1000);
	};

	const onDragEnd = async ({ source, destination }) => {
		if (!destination) return;

		if (source.droppableId === destination.droppableId) {
			console.log({ source, destination });

			const tasksCol = tasks.filter(
				(task) => task.sectionId == source.droppableId
			);

			const [removed] = tasksCol.splice(source.index, 1);
			console.log({ removed });

			tasksCol.splice(destination.index, 0, removed);

			const newTasks = tasks.map(
				(task) => tasksCol.find((item) => item.id == task.id) ?? task
			);
			dispatch(setTasks(newTasks));

			console.log(tasksCol);

			try {
				await taskApi.updatePosition({
					resourceList: tasksCol,
					destinationList: tasksCol,
					resourceSectionId: Number(source.droppableId),
					destinationSectionId: Number(destination.droppableId),
				});
			} catch (error) {
				console.log(error);
			}
			return;
		}

		let sourceTask = tasks.find(
			(task) =>
				task.sectionId == source.droppableId && task.position == source.index
		);
		sourceTask = {
			...sourceTask,
			position: Number(destination.index),
			sectionId: Number(destination.droppableId),
		};

		let sourceTasks = tasks.filter(
			(item) => item.sectionId == source.droppableId
		);
		sourceTasks = sourceTasks
			.filter((item) => item.id !== sourceTask.id)
			.map((item, index) => {
				return { ...item, position: index };
			});

		let destinationTasks = tasks.filter(
			(task) => task.sectionId == destination.droppableId
		);

		if (destinationTasks.length == destination.index) {
			destinationTasks = [...destinationTasks, sourceTask];
		} else {
			let flag = false;
			destinationTasks = destinationTasks.map((task) => {
				if (task.position == destination.index) {
					flag = true;
				}
				if (flag) {
					task = { ...task, position: task.position + 1 };
					return task;
				} else return task;
			});
			destinationTasks = [...destinationTasks, sourceTask];
		}

		let newTasks;
		newTasks = tasks.map(
			(task) => destinationTasks.find((item) => item.id == task.id) ?? task
		);
		newTasks = newTasks.map(
			(task) => sourceTasks.find((item) => item.id == task.id) ?? task
		);

		dispatch(setTasks(newTasks));

		try {
			await taskApi.updatePosition({
				resourceList: sourceTasks,
				destinationList: destinationTasks,
				resourceSectionId: Number(source.droppableId),
				destinationSectionId: Number(destination.droppableId),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const createTask = async (sectionId) => {
		const { task } = await taskApi.createTask(sectionId);
		dispatch(addTask(task));
	};

	useEffect(() => {
		if (data) {
			dispatch(setSections(data));
		}
	}, [data, dispatch]);

	useEffect(() => {
		console.log(boards?.tasks);
		if (boards?.tasks) {
			dispatch(setTasks(boards.tasks));
		}
	}, [boards?.tasks, dispatch]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginRight: '20px',
				}}
			>
				<Button onClick={createSection}>Add section</Button>

				<Typography variant="body2" fontStyle="700">
					{sections?.length} sections
				</Typography>
			</Box>

			<Divider
				sx={{
					margin: '10px 0',
				}}
			/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						gap: '80px',
						width: 'calc(100vw - 400px)',
						overflowX: 'auto',
					}}
				>
					{sections.length > 0 &&
						sections?.map((section, index) => (
							<div key={section.id} style={{ width: '300px' }}>
								<Droppable
									key={section.id}
									droppableId={section?.id?.toString()}
								>
									{(provided) => (
										<Box
											ref={provided.innerRef}
											{...provided.droppableProps}
											sx={{
												width: '300px',
												padding: '10px',
												marginRight: '20px',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													marginBottom: '10px',
												}}
											>
												<TextField
													value={section.title}
													placeholder="Untitled"
													variant="outlined"
													onChange={(e) => {
														updateTitleSection(
															section.id,
															index,
															e.target.value
														);
													}}
													sx={{
														flexGrow: 1,
														'& .MuiOutlinedInput-input': { padding: 0 },
														'& .MuiOutlinedInput-notchedOutline': {
															border: 'unset ',
														},
														'& .MuiOutlinedInput-root': {
															fontSize: '1rem',
															fontWeight: '700',
														},
													}}
												/>

												<IconButton
													variant="outlined"
													size="small"
													sx={{
														color: 'gray',
														'&:hover': {
															color: 'green',
														},
													}}
													onClick={() => createTask(section.id)}
												>
													<AddOutlinedIcon />
												</IconButton>

												<IconButton
													variant="outlined"
													size="small"
													sx={{
														color: 'gray',
														'&:hover': {
															color: 'red',
														},
													}}
													onClick={() => deleteSection(section.id)}
												>
													<DeleteOutlinedIcon />
												</IconButton>
											</Box>
											{/* Tasks list */}
											{tasks
												?.filter((item) => item.sectionId == section.id)
												.map((task, index) => (
													<Draggable
														key={task.id}
														draggableId={task.id.toString()}
														index={index}
													>
														{(provided, snapshot) => (
															<Card
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																sx={{
																	padding: '10px',
																	marginBottom: '10px',
																	cursor: snapshot.isDragging
																		? 'grab'
																		: 'pointer!important',
																}}
															>
																<Typography>
																	{task.title === '' ? 'Untitled' : task.title}
																</Typography>
															</Card>
														)}
													</Draggable>
												))}
										</Box>
									)}
								</Droppable>
							</div>
						))}
				</Box>
			</DragDropContext>
		</>
	);
};

export default Kanban;
