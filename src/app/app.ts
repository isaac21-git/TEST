import { Component, computed, signal } from '@angular/core';
import type { Task } from './task';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [Navbar],
})
export class App {
  menuOpen = false;

  // Notre liste de tâches
  tasks = signal<Task[]>([
    { id: 1, title: 'Créer la Navbar', completed: true },
    { id: 2, title: 'Créer la Sidebar', completed: false },
    { id: 3, title: 'Connecter une API', completed: false }
  ]);

  // Calcul automatique du nombre total
  totalTasks = computed(() => this.tasks().length);

  // Calcul automatique des tâches terminées
  completedTasks = computed(() =>
    this.tasks().filter(task => task.completed).length
  );

  // Ajouter une tâche
  addTask(input: HTMLInputElement) {
    const title = input.value.trim();

    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };

    this.tasks.update(tasks => [...tasks, newTask]);

    input.value = '';
  }

  // Terminer ou réactiver une tâche
  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }
 // Supprimer une tâche
  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }

   // Renommer une tâche
   renameTask(id: number) {
     if (typeof window === 'undefined') return;

     const currentTask = this.tasks().find(task => task.id === id);
     if (!currentTask) return;

     const newTitle = window.prompt('Nouveau titre :', currentTask.title)?.trim();
     if (!newTitle) return;

     this.tasks.update(tasks =>
       tasks.map(task =>
         task.id === id ? { ...task, title: newTitle } : task
       )
     );
   }}

//   renameTask(id: number) {
//     const newTask = this.tasks().find(task => task.id === id);
//     if (!newTask) return;

//     const newTitle = window.prompt('Nouveau titre :', newTask.title)?.trim();
//     if (!newTitle) return;

//     this.tasks.update(tasks =>
//       tasks.map(task =>
//         task.id === id ? { ...task, title: newTitle } : task
//       )
//     );
//   