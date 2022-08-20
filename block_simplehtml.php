<?php

require_once("$CFG->libdir/formslib.php");

class simplehtml_form extends moodleform
{
    //Add elements to form
    public function definition()
    {
        global $CFG, $PAGE;

        $mform = $this->_form; // Don't forget the underscore! 


        $mform->addElement('header', 'headerplugin', 'Subir archivos');
        $mform->addElement('text', 'usuario', 'Usuario'); // Add elements to your form.
        //$mform->setType('text', PARAM_NOTAGS);                   // Set type of element.
        //$mform->setDefault('text', 'Ingrese su usuario de agora');        // Default value.
        $mform->addElement('password', 'password', 'Contraseña');
        //$mform->setType('text', PARAM_NOTAGS);   
        $mform->addElement('button', 'loginBTN', "Iniciar Sesión");
        $mform->addElement('button', 'logoutBTN', "Cerrar sesión");
        $mform->addElement('filepicker', 'userfile', get_string('file'), null, array('maxbytes' => 2000000000, 'accepted_types' => '*'));
        //$this->add_action_buttons();
        //$mform->addElement('choosecoursefile', 'mediafile', get_string('mediafile', 'lesson'), 2);
        $mform->addElement('text', 'title', 'Titulo'); // Add elements to your form.
        $mform->addElement('text', 'description', 'Descripción');
        $mform->addElement('text', 'comment', 'Comentario'); 
        $mform->addElement('button', 'submitBTN', "Subir archivo");
        
    }
    //Custom validation should be added here
    function validation($data, $files)
    {
        return array();
    }
}

class block_simplehtml extends block_base
{
    public function init()
    {
        $this->title = "Respalde sus archivos en AGORA";
    }

    /**
     * Gets the block contents.
     *
     * @return string The block HTML.
     */
    public function get_content()
    {
        global $OUTPUT, $PAGE,$CFG;

        if ($this->content !== null) {
            return $this->content;
        }

        $this->content = new stdClass();
        $this->content->footer = 'Use su usuario de agora';
        $PAGE->requires->js(new moodle_url($CFG->wwwwroot . '/blocks/simplehtml/main.js'));
        $PAGE->requires->css(new moodle_url($CFG->wwwwroot . '/blocks/simplehtml/main.css'));
        $mform = new simplehtml_form();

        $this->content->text = $mform->render(); 
        return $this->content;
    }

    /**
     * Defines in which pages this block can be added.
     *
     * @return array of the pages where the block can be added.
     */
    public function applicable_formats()
    {
        return [
            'admin' => false,
            'site-index' => true,
            'course-view' => true,
            'mod' => false,
            'my' => true,
        ];
    }

    public function instance_allow_multiple()
    {
        return true;
    }

    // The PHP tag and the curly bracket for the class definition 
    // will only be closed after there is another function added in the next section.
}
