<?php
namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            'phone' => [
                'required',
                'string',
                'max:11',
                'min:11',
                function ($attribute, $value, $fail) {
                    if (! in_array(substr($value, 0, 3), ['013', '014', '015', '016', '017', '018', '019'])) {
                        $fail('The phone must start with 013, 014, 015, 016, 017, 018, or 019.');
                    }
                },
                Rule::unique(User::class, 'phone')->ignore($this->user()->id),
            ],
        ];
    }
}
