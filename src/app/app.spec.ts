import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the dashboard title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('TaskFlow');
  });

  it('should add a task', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const input = document.createElement('input');
    input.value = 'Nouvelle tâche';

    app.addTask(input);

    expect(app.tasks().length).toBe(4);
    expect(app.tasks()[3].title).toBe('Nouvelle tâche');
  });
});
