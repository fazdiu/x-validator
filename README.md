# x-validator plugin alpine

Alpine plugin to easily validate forms

## Table of Contents

 - [Installation](https://github.com/fernandcf/x-validator#installation)
 - [Usage](https://github.com/fernandcf/x-validator#usage)
 - [Setup ( Rules - Messages )](https://github.com/fernandcf/x-validator#setup)
 - [Reserved Keyword](https://github.com/fernandcf/x-validator#reserved-keyword)
 - [Show Error Messages](https://github.com/fernandcf/x-validator#show-error-messages)
 - [Methods](https://github.com/fernandcf/x-validator#methods)
 - [Events](https://github.com/fernandcf/x-validator#handling-events)
 - [Available Validation Rules](https://github.com/fernandcf/x-validator#available-validation-rules)

## Installation

#### Via CDN

    <!-- Alpine Plugin x-validator -->
    <script  defer src="https://unpkg.com/@fernandcf/x-validator"></script>
    <!-- Alpine Core -->
    <script  defer  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>


#### Via NPM

    npm i @fernandcf/x-validator
    #or
    yarn add@fernandcf/x-validator



## Usage

HTML:

    <form x-validator>
	    <input x-rules="['required','numeric','between:1,10']" />
    </form>
    <!-- OR -->
    <form x-data="{
	    rules:{
		  name: ['required','numeric','between:1,10']
		}
	}" x-validator>
	    <input x-rules="name" />
    </form>
    <!-- OR -->
    <form x-data="{
	    rules:{
		  name: 'required|numeric|between:1,10'
		}
	}" x-validator>
	    <input x-rules="name" />
    </form>
  
## Setup

There are the following options:

 - Rules - To add new validation rules. Supports `Promise`.
 - Messages - To add and/or update error messages.

#### Adding new rule

    <form x-validator="{
	    rules:{
		    exists({value:Array|String,args:Array,input:HTMLElement}){
				if(value){
					return true;	
				}
				return false;
		    }
	    },
	    messages: {
		    exists:'Error message from my new rule.'
		}
    }">
	    <input type="text" x-rules="['exists']" />
    </form>

#### Adding new rule (Promise)

    <form x-validator="{
	    rules:{
		    exists({value:Array|String,args:Array,input:HTMLElement}){
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(value ? true : false)
					}, 2000);
				});
		    }
	    },
	    messages: {
		    exists:'Error message from my new rule.'
		}
    }">
	    <input type="text" x-rules="['exists']" />
    </form>

## Reserved Keyword

By default, some keyword are reserved for Validator internal use

 - validator
 
## Show Error Messages

#### Error messages from the start/server.

To show start/server errors. You must do the following:

    <form x-data="{
		 validator:{
			error:{
				description: 'The username has already been taken.'
			}
		 }   
	 }" x-validator>
		<input type="text" name="description" x-rules="['required']"/>
		<!-- error message for field 'description' -->
		<div x-text="validator.error.description"></div>
    </form>

 This is useful if you are using a backend like Laravel and need to display error messages.

#### Get the error message

To get the error message for a specific field, you must use the `validator` keyword inside `error` and lastly the field name. `validator.error.{field_name}`. It will return an empty string if validation has passed, otherwise it will return an error message.

For example

    <form x-validator>
		<input type="text" name="description" x-rules="['required']"/>
		<!-- error message for field 'description' -->
		<div x-text="validator.error.description"></div>
    </form>
    
#### Get all error messages

To get all error messages for a specific field, you must use the `validator` keyword inside `errors` and lastly the field name. `validator.errors.{field_name}`. It will return an object of error messages.

For example

    <form x-validator>
		<input type="text" name="description" x-rules="['required']"/>
		<!-- error messages for field 'description' --> 
		<template  x-for="(item, index) in  validator.errors.description" :key="index">
			<div>
				<p>Rule name: <span x-text="index"></span></p>
				<p>Message:<span x-text="item"></span></p>
			</div>
		</template>
    </form>


## Methods

 - init(fields:Array[HTMLElement]|null)
 - validate(fields:Array[HTMLElement]|null)
 - setLanguage(Locale:String)
  
#### `validator.init(fields:Array[HTMLElement]|null)`
Initializes the validator on the field or fields. Receives an optional parameter `fields`   that is an array of HTMLElements to initialize. It is recommended that you call it inside magic [$nextTick](https://alpinejs.dev/magics/nextTick).

 #### `validator.validate(fields:Array[HTMLElement]|null)`
It will validate the field or fields. Receives an optional parameter `fields`   that is an array of HTMLElements to validate. Returns a true value to indicate that the validation was successful and a false value otherwise.

 #### `validator.setLanguage(Locale:String)`
Set the language of the error messages.  Default 'en'.  Available languages:

 - English (en)
 - Spanish (es)

For example:

    <form x-validator x-init="validator.setLanguage('es')">
		...	
	</form>

## Handling Events
There are four types of events that can be handled with hooks:

 - validator.success
 - validator.failed
 - field.invalid
 - field.valid

For example in Alpinejs:

    <input x-on:field-invalid.dot="console.log($event.detail.errors)" x-rules="['required','min:5']" />

Since dots within the event name are reserved by [Alpine](https://alpinejs.dev/directives/on#dot) you need to write them with dashes and add the `.dot` modifier.

#### `validator.success`

This event will occur when the validation ends with no errors:

    <form x-validator x-on:validator-success.dot="alert('success')">
	    <input x-rules="['required','min:5']" />
    </form>

#### `validator.failed`

This event will occur when the validation ends while there are some errors in the form:

    <form x-validator x-on:validator-failed.dot="alert('failed')">
	    <input x-rules="['required','min:5']" />
    </form>

#### `field.valid`

This event is fired when a particular field has no validation errors:

    <input x-on:field-valid.dot="alert('failed')" x-rules="['required','min:5']" />
    
#### `field.invalid`

When a particular field has errors, you can handle the errors with this event:

    <input x-on:field-invalid.dot="alert('failed')" x-rules="['required','min:5']" />
    
## Available Validation Rules:

For example: 

    <input x-rules="['string','between:5,9']" />

#### optional 
The field under validation can be empty:

#### required 
The field under validation must not be empty.

#### accepted 
The field under validation must not be empty.

#### alphaNum
The field under validation must contain only alpha-numeric characters.

#### alpha
The field under validation must contain only alphabetic characters.

#### array
Useful for validating single/multiple selectors, group of checkbox/radio inputs (with the same name).

#### between:min,max
The field under validation must be a number between the given range.

#### creditCard
The field under validation must be a credit card number.

#### date
The field under validation must be a valid date.

#### digits:value
The field under validation must be a valid date.

#### email
The field under validation must be an email.

#### endsWith:foo,bar...
The field under validation must end with one of the given values.

#### equalTo:fieldName
The field under validation must be equal to another field.

#### file
The field under validation must be a file.

#### hexColor
The field under validation must be a is a hexadecimal color.

#### in:foo,bar...
The field under validation must be included in the given list of values.

#### integer
The field under validation must be an integer.

#### max:value
The field under validation must be less than or equal to a maximum value.

#### min:value
The field under validation must have a minimum value.

#### mobilePhone:locale1,locale2...
The field under validation must have a a mobile phone number. Available locales:  `['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-PS', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'az-LB', 'az-LY', 'be-BY', 'bg-BG', 'bn-BD', 'bs-BA', 'ca-AD', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LU', 'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AU', 'en-BM', 'en-BS', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 'en-HK', 'en-IE', 'en-IN', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-LS', 'en-MO', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-SS', 'en-TZ', 'en-UG', 'en-US', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EC', 'es-ES', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-AF', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BJ', 'fr-CD', 'fr-CF', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF', 'fr-RE', 'fr-WF', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'ir-IR', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'ko-KR', 'ky-KG', 'lt-LT', 'mg-MG', 'mn-MN', 'ms-MY', 'my-MM', 'mz-MZ', 'nb-NO', 'ne-NP', 'nl-AW', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-AO', 'pt-BR', 'pt-PT', 'ro-Md', 'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'so-SO', 'sq-AL', 'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-UZ', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW']`

#### numeric
The field under validation must be numeric.

#### regex:pattern
The field under validation must match the given regular expression.

#### size:value
The field under validation must have a size matching the given _value_. For string data, _value_ corresponds to the number of characters. For numeric data, _value_ corresponds to a given integer value.

#### slug
The field under validation must be of type slug.

#### startsWith:foo,bar...
The field under validation must end with one of the given values.

#### string
The field under validation must be a string

#### strongPassword
The field under validation must be considered a strong password or not. Conditions that apply are: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1.

#### time
The field under validation must be a is a valid time.

#### url
The field under validation must be a valid URL.

