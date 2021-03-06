import { Component, OnInit, Input } from '@angular/core';
import { CreatorAnswerComponent } from '../creator-answer/creator-answer.component';
import { Question } from 'src/app/models/survey/question';
import { Answer } from 'src/app/models/survey/answer';

@Component({
  selector: 'app-creator-survey-question',
  templateUrl: './creator-question.component.html',
  styleUrls: ['./creator-question.component.scss']
})
export class CreatorQuestionComponent implements OnInit
{
	@Input()
	public question: Question;
	@Input()
	private editableQuestion: boolean;

	private QuestionTYPES = Question.TYPES;

	constructor() { }

	ngOnInit() 
	{
	}

	onAddAnswerButtonClicked(questionType: Question.TYPES)
	{
		this.question.addAnswer(questionType);
	}

	onAnswerOrederedToDelete(answerToDelete: Answer)
	{
		this.question.deleteAnswer(answerToDelete);
	}
}
