<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dustbins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('token')->nullable();
            $table->date('token_expire')->nullable();
            $table->boolean('online_status')->default(false);
            $table->dateTimeTz('last_online')->nullable();
            $table->string('last_ip')->nullable();
            $table->integer('fill_level')->default(0);
            $table->boolean('sms_notification')->default(false);
            $table->integer('notification_threshold')->default(90);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dustbins');
    }
};
