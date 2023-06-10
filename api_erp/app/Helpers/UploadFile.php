<?php

namespace App\Helpers;


class UploadFile
{
    static public function upload($photo, $dir)
    {
        if ($photo->isValid()) {
            $fileName = 'karyawan_' . time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs("public/" . $dir, $fileName);
            return $fileName;
        } else {
            return false;
        }
    }
}
