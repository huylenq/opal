# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opal', '0028_auto_20170210_1146'),
    ]

    operations = [
        migrations.AlterField(
            model_name='macro',
            name='expanded',
            field=models.TextField(help_text='This is thte text that it will expand to.'),
        ),
        migrations.AlterField(
            model_name='macro',
            name='title',
            field=models.CharField(max_length=200, help_text='The text that will display in the dropdown. No spaces!'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='can_extract',
            field=models.BooleanField(default=False, help_text='This user will be able to download data from advanced searches'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='force_password_change',
            field=models.BooleanField(default=True, help_text='Force this user to change their password on the next login'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='readonly',
            field=models.BooleanField(default=False, help_text='This user will only be able to read data - they have no write/edit permissions'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='restricted_only',
            field=models.BooleanField(default=False, help_text='This user will only see teams that they have been specifically added to'),
        ),
    ]
