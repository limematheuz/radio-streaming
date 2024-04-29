import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should show radio singular title', () => {
    it('should show radio singular title', () => {
      expect(component.title).toBe('radio singulars');
    });

    it('should return a title: Radio Singulars', () => {
      const title = fixture.nativeElement.querySelector('h1');
      expect(title.textContent).toBe('radio singulars');
    });
  });

  describe('should search radio station by name', () => {
    it('it should have an input with the placeholder, "escribe el nombre de la emisora"', () => {
      const input = fixture.nativeElement.querySelector('input');
      const placeholder = 'escribe el nombre de la emisora';
      expect(input.placeholder).toBe(placeholder);
    });

    it('it should have a search button with the name "Search" ', () => {
      const buttonSearch = fixture.nativeElement.querySelector('button');
      const buttonName = 'Search';
      expect(buttonSearch.textContent).toBe(buttonName);
    });

    it('it should run the search function once', () => {
      const radioStationSpy = jest.spyOn(component, 'searchRadio');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      expect(radioStationSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('radio station list', () => {
    it('should exist a list station', () => {
      const radioStationList = fixture.nativeElement.querySelector('ul');
      expect(radioStationList).not.toBeNull();
      console.log(radioStationList);
    });

    it('list should start empty', () => {
      const liElements = fixture.nativeElement.querySelectorAll('li');
      const arrayLength = liElements.length;
      expect(arrayLength).toBe(0);
    });

    it('it should show one result when search is succesful', () => {
      component.radioStations = [
        {
          name: 'Test',
          url: 'test',
          country: 'test',
        },
      ];
      const radioStationSpy = jest.spyOn(component, 'searchRadio').mockImplementation(()=>{
        component.filterArray = component.radioStations.filter((radio)=>{
          return radio.name.includes("t");

        })
      })
      const liElements = fixture.nativeElement.querySelectorAll('li');
      const button = fixture.debugElement.query(By.css('button'));
      // const getInput = fixture.debugElement.query(By.css('input'));
      // getInput.triggerEventHandler('keyup', 'teletaxi');
      component.inputValue = '8';
      button.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(liElements.length).toBeGreaterThan(0);
    });
  });
});
